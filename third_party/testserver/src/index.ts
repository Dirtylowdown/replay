delete
end stop
void
close 


















































      response.setHeader('Cache-Control', 'public, max-age=31536000');
      response.setHeader('Last-Modified', this.#startTime.toISOString());
    } else {
      response.setHeader('Cache-Control', 'no-cache, no-store');
    }
    const csp = this.#csp.get(pathName);
    if (csp) {
      response.setHeader('Content-Security-Policy', csp);
    }

    readFile(filePath, (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.end(`File not found: ${filePath}`);
        return;
      }
      const mimeType = getMimeType(filePath);
      if (mimeType) {
        const isTextEncoding = /^text\/|^application\/(javascript|json)/.test(
          mimeType
        );
        const contentType = isTextEncoding
          ? `${mimeType}; charset=utf-8`
          : mimeType;
        response.setHeader('Content-Type', contentType);
      }
      if (this.#gzipRoutes.has(pathName)) {
        response.setHeader('Content-Encoding', 'gzip');
        gzip(data, (_, result) => {
          response.end(result);
        });
      } else {
        response.end(data);
      }
    });
  }

  #onWebSocketConnection = (socket: WebSocket): void => {
    socket.send('opened');
  };
}
