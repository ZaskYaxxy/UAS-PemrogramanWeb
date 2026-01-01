let cart = [];

const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

function tambahKeKeranjang(namaProduk, harga) {
    cart.push({ name: namaProduk, price: harga });
    updateCartUI();
}

function updateCartUI() {
    const cartList = document.getElementById('cartList');
    const cartTotal = document.getElementById('cartTotal');
    const cartBadge = document.getElementById('cartBadge');
    
    if(cartBadge) cartBadge.innerText = cart.length;

    let total = 0;
    if(cartList) {
        cartList.innerHTML = '';
        if (cart.length === 0) {
            cartList.innerHTML = '<li class="list-group-item text-center text-muted">Keranjang masih kosong.</li>';
        } else {
            cart.forEach((item, index) => {
                total += item.price;
                cartList.innerHTML += `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div><small class="fw-bold">${item.name}</small></div>
                        <span class="badge bg-secondary rounded-pill">${formatRupiah(item.price)}</span>
                        <button class="btn btn-sm btn-danger ms-2" onclick="hapusItem(${index})">&times;</button>
                    </li>
                `;
            });
        }
    }
    if(cartTotal) cartTotal.innerText = formatRupiah(total);
}

function hapusItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) {
        alert("Keranjang kosong! Silakan pilih produk terlebih dahulu.");
    } else {
        let message = "Halo, saya ingin memesan:\n";
        let total = 0;
        cart.forEach(item => {
            message += "- " + item.name + " (" + formatRupiah(item.price) + ")\n";
            total += item.price;
        });
        message += "\nTotal: " + formatRupiah(total);
        alert("Pesanan Diterima!\n\n" + message);
        cart = [];
        updateCartUI();
        
        const modalEl = document.getElementById('cartModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if(modal) modal.hide();
    }
}

function updateWaktu() {
    const footerWaktu = document.getElementById("waktu-sekarang");
    if(footerWaktu) {
        const now = new Date();
        
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            timeZoneName: 'short' 
        };
        
        const timeString = now.toLocaleTimeString(undefined, options);
        
        footerWaktu.innerText = " | 🕒 " + timeString;
    }
}
setInterval(updateWaktu, 1000);
updateWaktu();