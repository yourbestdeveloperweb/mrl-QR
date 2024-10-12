function generarCodigoQr() {
    let sitioWeb = document.getElementById("sitioWeb").value;
    if (sitioWeb) {
        let contenedorCodigoQr = document.getElementById("codigoQr");
        contenedorCodigoQr.innerHTML = "";
        
        // Generar el QR
        let qr = new QRCode(contenedorCodigoQr, {
            text: sitioWeb,
            width: 256,
            height: 256,
        });

        // Esperar a que el QR se genere y luego permitir la descarga
        setTimeout(() => {
            let qrCanvas = contenedorCodigoQr.querySelector('canvas');
            let qrImageUrl = qrCanvas.toDataURL("image/png");

            // Asignar la URL de la imagen al botón de descarga
            let downloadBtn = document.querySelector(".download-button");
            downloadBtn.setAttribute("href", qrImageUrl);
            downloadBtn.setAttribute("download", "codigo-qr.png");
        }, 500); // Esperar medio segundo para que el QR se genere completamente

        document.getElementById("contenedorCodigoQr").style.display = "block";
    } else {
        alert("Por favor, ingresa una URL válida");
    }
}
