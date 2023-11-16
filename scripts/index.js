import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$TLOS ${formatCurrency(
            product.priceCents
          )}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
            data-product-id="${product.id}">Add to Cart</button>
        </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});
let walletAddress = "";

const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
            console.log(accounts[0]);
        } catch (err) {
            console.error(err.message);
        }
    } else {
        console.log("Please install MetaMask");
    }
};

const getCurrentlyWalletConnect = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({ method: "eth_accounts" });

            if (accounts.length > 0) {
                setWalletAddress(accounts[0]);
                console.log(accounts[0]);
            } else {
                console.log("Connect to MetaMask using Connect Wallet");
            }
        } catch (err) {
            console.error(err.message);
        }
    } else {
        console.log("Please install MetaMask");
    }
};

const addWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        window.ethereum.on("accountsChanged", (accounts) => {
            setWalletAddress(accounts[0]);
            console.log(accounts[0]);
        });
    } else {
        setWalletAddress("");
        console.log("Please install MetaMask");
    }
};

const setWalletAddress = (address) => {
    walletAddress = address;
    updateWalletStatus();
};

const updateWalletStatus = () => {
    const walletStatus = document.getElementById('walletStatus');
    if (walletAddress && walletAddress.length > 0) {
        walletStatus.textContent = `Connected: ${walletAddress.substring(0, 6)} ...${walletAddress.substring(38)}`;
    } else {
        walletStatus.textContent = 'Connect Wallet';
    }
};

const connectWalletButton = document.getElementById('connectWalletButton');
connectWalletButton.addEventListener('click', connectWallet);

getCurrentlyWalletConnect();
addWallet();