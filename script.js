// Инициализация корзины
let cart = [
    {
        name: "SPC ЛАМИНАТ ROYCE EMOTION ДУБ ГУСТО EM-604",
        description: "42 класс 4 мм",
        price: 1790,
        quantity: 1,
        areaPerPack: 2.16,
        image: "https://polvamvdom.ru/f/prods/a/1/4/92_1690981692.jpg"
    },
    {
        name: "SPC ЛАМИНАТ ROYCE SENSE ДУБ АЙА SE-710",
        description: "42 класс 4 мм",
        price: 1620,
        quantity: 1,
        areaPerPack: 2.32,
        image: "https://дешевлепола.net/image/cache/catalog/roycejersey/spc-laminat-royce-emotion-dub-sueriti-800x800.jpg"
    }
];

// Обновление отображения корзины
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ''; // Очищаем текущие элементы корзины
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        // Округление площади до двух знаков после запятой
        const area = (item.quantity * item.areaPerPack).toFixed(2);

        // Создаем HTML элемент для товара
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <div class="item-price">
                <p>${item.price} ₽ / м²</p>
            </div>
            <div class="item-controls">
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="text" value="${area}" disabled>
                    <span class="unit">м²</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="item-packs">
                    <button class="quantity-btn" onclick="updatePacks(${index}, -1)">-</button>
                    <input type="text" value="${item.quantity}" disabled>
                    <span class="unit">уп.</span>
                    <button class="quantity-btn" onclick="updatePacks(${index}, 1)">+</button>
                </div>
            </div>
            <div class="item-total">
                <p>${itemTotal} ₽</p>
            </div>
            <button class="remove-item" onclick="removeItem(${index})">×</button>
        `;
        
        // Добавляем товар в контейнер корзины
        cartItems.appendChild(itemElement);
    });

    // Обновляем итоговую цену
    document.getElementById("total-price").textContent = `${total} ₽`;
}

// Обновление количества площади
function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity += change;

    if (item.quantity < 1) {
        item.quantity = 1; // Минимум 1 упаковка
    }

    renderCart();
}

// Обновление количества упаковок
function updatePacks(index, change) {
    const item = cart[index];
    item.quantity += change;

    if (item.quantity < 1) {
        item.quantity = 1; // Минимум 1 упаковка
    }

    renderCart();
}

// Удаление товара
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Очистка корзины
function clearCart() {
    cart = [];
    renderCart();
}

// Инициализация товаров для теста
function initCart() {
    renderCart();
}

// Запуск
initCart();
