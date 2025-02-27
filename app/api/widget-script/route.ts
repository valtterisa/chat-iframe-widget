import { NextResponse } from "next/server";

const widgetScript = `
(function() {
  // Ensure the chat widget initialization function exists
  if (typeof window.initChatWidget !== 'function') {
    console.error('initChatWidget is not defined. Make sure your widget bundle is loaded.');
    return;
  }
  
  // Create a container if it doesn't exist
  var containerId = 'chat-widget-container';
  var container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
  }
  
  // Initialize the chat widget inside the container
  window.initChatWidget({ container: '#' + containerId });
})();
`;

export async function GET() {
  return new NextResponse(widgetScript, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}
