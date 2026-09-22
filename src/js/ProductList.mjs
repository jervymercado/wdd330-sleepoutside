import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.NameWithoutBrand}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.list = [];
    }

    async init() {
        this.list = await this.dataSource.getData(this.category);
        this.renderList(this.list);
    }

    sort(sortBy) {
        if (sortBy === 'name') {
            this.list.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
        } else if (sortBy === 'price') {
            this.list.sort((a, b) => a.FinalPrice - b.FinalPrice);
        }
        this.renderList(this.list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, 'afterbegin', true);
    }
}