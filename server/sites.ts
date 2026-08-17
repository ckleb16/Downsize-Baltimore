interface AssetsBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: AssetsBinding;
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || request.method !== "GET") {
      return response;
    }

    const accept = request.headers.get("accept") ?? "";
    if (!accept.includes("text/html")) {
      return response;
    }

    // The asset layer canonicalizes /index.html to /, so request the root
    // document directly and preserve the original client-side route URL.
    const indexUrl = new URL("/", request.url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};

export default worker;
