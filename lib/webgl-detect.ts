export interface WebGLCapabilities {
  supported: boolean;
  webgl2: boolean;
  renderer: string;
  vendor: string;
}

export function detectWebGLCapabilities(): WebGLCapabilities {
  if (typeof window === "undefined") {
    return { supported: false, webgl2: false, renderer: "SSR", vendor: "SSR" };
  }

  try {
    const canvas = document.createElement("canvas");
    const gl2 = canvas.getContext("webgl2");
    if (gl2) {
      const debugInfo = gl2.getExtension("WEBGL_debug_renderer_info");
      return {
        supported: true,
        webgl2: true,
        renderer: debugInfo ? String(gl2.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)) : "WebGL2",
        vendor: debugInfo ? String(gl2.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)) : "Vendor"
      };
    }

    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    return {
      supported: !!gl,
      webgl2: false,
      renderer: gl ? "WebGL1" : "Unsupported",
      vendor: "Generic"
    };
  } catch {
    return { supported: false, webgl2: false, renderer: "Error", vendor: "Unknown" };
  }
}
