function generarCodigoQr() {
    let sitioWeb = document.getElementById("sitioWeb").value;
    
    // Obtener el color del QR
    let colorQR = document.getElementById("colorQR").value;
    
    // Obtener la imagen que el usuario selecciona
    let imagenQR = document.getElementById("imagenQR").files[0];

    if (sitioWeb) {
        let contenedorCodigoQr = document.getElementById("codigoQr");
        contenedorCodigoQr.innerHTML = "";  // Limpiar cualquier QR previo

        // Generar el QR con el color personalizado
        let qr = new QRCode(contenedorCodigoQr, {
            text: sitioWeb,
            width: 256,
            height: 256,
            colorDark: colorQR,  // Aplicar el color elegido
            colorLight: "#ffffff" // Fondo blanco por defecto
        });

        // Esperar a que el QR se genere
        setTimeout(() => {
            let qrCanvas = contenedorCodigoQr.querySelector('canvas');
            let qrContext = qrCanvas.getContext('2d');
            let qrImageUrl = qrCanvas.toDataURL("image/png");

            // Si el usuario subió una imagen, mostrarla y agregarla al QR
            if (imagenQR) {
                let reader = new FileReader();
                reader.onload = function (event) {
                    let img = new Image();
                    img.src = event.target.result;

                    img.onload = function() {
                        // Dibujar la imagen en el centro del QR
                        let imgSize = 50; // Tamaño ajustable de la imagen
                        let x = (qrCanvas.width - imgSize) / 2;
                        let y = (qrCanvas.height - imgSize) / 2;
                        qrContext.drawImage(img, x, y, imgSize, imgSize);

                        // Mostrar la imagen centrada en la vista previa del QR
                        let imgElement = document.createElement("img");
                        imgElement.src = event.target.result;
                        imgElement.classList.add("center-image");
                        contenedorCodigoQr.appendChild(imgElement);

                        // Actualizar el enlace de descarga con la imagen incorporada
                        let downloadBtn = document.querySelector(".download-button");
                        downloadBtn.href = qrCanvas.toDataURL("image/png");
                        downloadBtn.download = "codigo-qr-con-imagen.png";
                    };
                };
                reader.readAsDataURL(imagenQR);
            } else {
                // Si no hay imagen, permitir la descarga del QR solo
                let downloadBtn = document.querySelector(".download-button");
                downloadBtn.href = qrImageUrl;
                downloadBtn.download = "codigo-qr.png";
            }
        }, 500); // Esperar medio segundo para que el QR se genere completamente

        document.getElementById("contenedorCodigoQr").style.display = "block";
    } else {
        alert("Por favor, ingresa una URL válida");
    }
}
