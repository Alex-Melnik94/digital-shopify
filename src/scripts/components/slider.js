import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

class SliderCards extends HTMLElement {
	constructor() {
		super();
		const settings = JSON.parse(this.dataset.settings || '{}');
		this.swiper = new Swiper(this, {
			...settings,
			modules: [Navigation, Pagination],
		});
	}
}

customElements.define('slider-cards', SliderCards);
