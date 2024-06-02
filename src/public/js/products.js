const socket = io();


// Escuchar el evento cuando se hace clic en el botón "Agregar"
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[id^="button_add_"]'); // Seleccionar todos los botones que comienzan con "button_add_"
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('id').replace('button_add_', ''); // Obtener el ID del producto desde el ID del botón
            const productInfo = {
                _id: productId,
            };
            // Enviar el ID del producto al servidor a través del socket
            socket.emit('add_Product_cart', productInfo);
        });
    });
});


socket.on('productAdded', (message) =>{

    console.log(message)

})