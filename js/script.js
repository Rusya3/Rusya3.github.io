// Инициализация корзины
let cart = [
    {
        name: "SPC ЛАМИНАТ ROYCE EMOTION ДУБ ГУСТО EM-604",
        description: "42 класс 4 мм",
        price: 1790,
        quantity: 1,
        areaPerPack: 2.16,
        image: "https://polvamvdom.ru/f/prods/a/1/4/92_1690981692.jpg",
        sale: true // Товар со скидкой
    },
    {
        name: "SPC ЛАМИНАТ ROYCE SENSE ДУБ АЙА SE-710",
        description: "42 класс 4 мм",
        price: 1620,
        quantity: 1,
        areaPerPack: 2.32,
        image: "https://дешевлепола.net/image/cache/catalog/roycejersey/spc-laminat-royce-emotion-dub-sueriti-800x800.jpg",
        sale: false // Товар без скидки
    }
];

// Обновление отображения корзины
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ''; // Очищаем текущие элементы корзины
    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;

        let discountedPrice = item.price;

        if (item.sale) {
            discountedPrice = (item.price * 0.83).toFixed(2); // Скидка 17%
            itemTotal = discountedPrice * item.quantity;
        }

        total += parseFloat(itemTotal);

        // Округление площади до двух знаков после запятой
        const area = (item.quantity * item.areaPerPack).toFixed(2);

        // Создаем HTML элемент для товара
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
<div class="item-image-details xl:gap-5">
                <div class="item-image">
                    <!--                    <img src="https://via.placeholder.com/100" alt="SPC ЛАМИНАТ ROYCE EMOTION ДУБ ГУСТО EM-604">-->
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                <h3>${item.name}</h3>
                <p class="sec-color">${item.description}</p>
                    <div class="item-price hidden sm:block xl:hidden">
                        <p>${item.price} ₽
                ${item.sale ? `<span class="sec-color line-through">${item.price} ₽</span>` : ''} / м²</p>
                    </div>
                </div>
                <button class="remove-item" onclick="removeItem(${index})">×</button>
            </div>
            <div class="item-price sm:hidden xl:block">
                <p>${item.price} ₽
                ${item.sale ? `<span class="sec-color line-through">${item.price} ₽</span>` : ''} / м²</p>
            </div>
            <div class="item-controlsitem-total flex flex-column sm:flex-row sm:align-items-center xl:align-items-start">
                <div class="xl:flex-column item-controls">
                    <!-- Контейнер для изменения площади -->
                    <div class="item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="text" value="${area}" disabled>
                        <span class="unit">м²</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <span class="sec-color sm:hidden">=</span>
                    <!-- Контейнер для изменения упаковок -->
                    <div class="item-packs">
                        <button class="quantity-btn" onclick="updatePacks(${index}, -1)">-</button>
                        <input type="text" value="${item.quantity}" disabled>
                        <span class="unit">уп.</span>
                        <button class="quantity-btn" onclick="updatePacks(${index}, 1)">+</button>
                    </div>
                </div>
                
                <div class="item-total sm:flex-column sm:gap-0">
                    <p>${itemTotal.toFixed(0)} ₽</p>
                    
                    ${item.sale ? `
                    <div class="flex align-items-center gap-2">
                        <span class="sec-color line-through">${(item.price * item.quantity).toFixed(0)} ₽</span>
                        <div class="sale">-17%</div>
                    </div>` : ''}
                </div>
            </div>
            <button class="remove-item hidden xl:block" onclick="removeItem(${index})">×</button>
        `;
        
        // Добавляем товар в контейнер корзины
        cartItems.appendChild(itemElement);
    });

    // Обновляем итоговую цену
    document.getElementById("total-price").textContent = `${total.toFixed(0)} ₽`;
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
