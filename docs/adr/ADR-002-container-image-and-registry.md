# ADR-002: Container Image Build and Registry

## Status: Accepted (Date: 2026-10-10)

## Context

ADR-001 moved the app to an SSR Node server that has to run as a container.
We need a repeatable image build and a registry the runtime can pull from.

## Decision

- Build with a multi-stage Dockerfile on node:22-alpine. The builder stage
  compiles the app; the runner stage keeps production dependencies and dist/
  only. Node 22 matches the engines field in package.json.
- Run the container as the non-root node user, so a compromised process has
  fewer privileges.
- Add a HEALTHCHECK on /api/health that calls 127.0.0.1, not localhost. In
  Alpine localhost resolves to IPv6 (::1) while the server listens on IPv4
  0.0.0.0, so the check failed even though the app was serving requests.
- Keep a strict .dockerignore (cdk/, docs/, coverage/, CI and editor files).
  The build context dropped from about 600 MB to 600 KB.
- Use Amazon ECR as the registry, in the same AWS account and region as the
  rest of the infrastructure. Images are tagged with a version (v1.0.0).
- Create the ECR repository with CDK in its own EcrStack. The deploy workflow
  only deploys the static site stack (CdkStack), so registry changes cannot
  break the live site.

## Consequences

- Positive: reproducible builds, small build context, a working health probe
  for the runtime, and registry infrastructure that is reviewed as code.
- Negative: the image is still large (about 437 MB) because astro, typescript
  and @astrojs/check are listed as dependencies. Moving build and check tools
  to devDependencies would shrink it.
- Negative: EcrStack is not deployed by the pipeline, so it needs a one-off
  cdk deploy EcrStack. Images are pushed manually until a CI job does it.
