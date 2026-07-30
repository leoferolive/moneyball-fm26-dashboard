# Deployment

## Architecture

The production dashboard runs as a static React/Vite bundle in Nginx. Kubernetes
serves it through the `moneyball` namespace, a ClusterIP Service, and the Traefik
Ingress at `moneyball.leoferolive.com.br`. The container health endpoint is
`/health`; all other unknown paths fall back to `index.html` for SPA navigation.

The cluster node is amd64, so CI publishes `linux/amd64` images to:

```
ghcr.io/leoferolive/moneyball-fm26-dashboard:<tag>
```

## One-time cluster bootstrap

Create the namespace and private-registry pull secret before the first deploy.
The GitHub token used for this secret must have `read:packages` for the image
repository.

```sh
kubectl apply -f k8s/prod/namespace.yaml
kubectl create secret docker-registry ghcr-secret \
  --namespace moneyball \
  --docker-server=ghcr.io \
  --docker-username=leoferolive \
  --docker-password='<GHCR_TOKEN>'
```

Configure the DNS/edge route for `moneyball.leoferolive.com.br` using the same
public path that exposes the other `*.leoferolive.com.br` Traefik ingresses. TLS
is terminated by that existing edge layer; the in-cluster Ingress uses Traefik's
`web` entrypoint.

## GitHub secrets

- `GHCR_PAT`: token with permission to publish images to GHCR.
- `TAILSCALE_AUTHKEY`: ephemeral/reusable auth key allowed to reach the k3s API.
- `KUBECONFIG`: base64-encoded kubeconfig for the k3s cluster.

## Delivery flow

1. Pull requests and pushes to `main` run lint, tests, Vite build, and a Docker
   image build.
2. A successful CI run on `main` creates the next patch release (`vX.Y.Z`) and
   GitHub Release.
3. Run **Deploy production** from GitHub Actions and pass that stable tag. The
   workflow rebuilds/publishes the image, applies the manifests, waits for the
   rollout, and calls the public health endpoint.

Production deployment deliberately remains manual; a successful release does
not update the cluster by itself.
