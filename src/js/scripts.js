import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import { gsap } from 'gsap';

const bodyTag = document.querySelector('body');
const wiper = document.createElement('div');
wiper.classList.add('wiper');

const wiperImage = document.createElement('img');
wiperImage.setAttribute('src', './img/logo.svg');

const wiperHolder = document.createElement('div');
const wiperText = document.createElement('h2');
wiperText.textContent = 'Wanderers';

wiperHolder.appendChild(wiperText);
wiper.appendChild(wiperImage);
wiper.appendChild(wiperHolder);
bodyTag.appendChild(wiper);

// tell Barba to use the prefetch plugin
barba.use(barbaPrefetch);

barba.init({
	debug: true,
	transitions: [
		{
			name: 'next',
			custom({ current, next, trigger }) {
				return (
					(trigger.classList && trigger.classList.contains('next')) ||
					trigger === 'forward'
				);
			},

			leave({ current, next, trigger }) {
				return new Promise(resolve => {
					const timeline = gsap.timeline({
						onComplete() {
							current.container.remove();
							resolve();
						},
					});

					const navigation = current.container.querySelectorAll(
						'header, a.next, a.previous'
					);
					const photos =
						current.container.querySelectorAll('div.photos');

					timeline
						.set(wiper, { x: '-100%' })
						.set(wiperImage, { opacity: 0 })
						.set(wiperText, { y: '100%' })
						.to(navigation, { opacity: 0 }, 0)
						.to(photos, { opacity: 0.25, x: '500' }, 0)
						.to(wiper, { x: 0 }, 0);
				});
			},

			beforeEnter({ current, next, trigger }) {
				wiperText.textContent = next.container.dataset.title;

				return new Promise(resolve => {
					const timeline = gsap.timeline({
						defaults: { duration: 1 },

						onComplete() {
							resolve();
						},
					});

					timeline
						.to(wiperImage, { opacity: 1 }, 0)
						.to(wiperText, { y: 0 }, 0)
						.to(wiperText, { y: '100%' }, 2)
						.to(wiperImage, { opacity: 0 }, 2);
				});
			},

			enter({ current, next, trigger }) {
				return new Promise(resolve => {
					const timeline = gsap.timeline({
						onComplete() {
							resolve();
						},
					});

					const navigation = next.container.querySelectorAll(
						'header, a.next, a.previous'
					);
					const photos =
						next.container.querySelectorAll('div.photos');

					timeline
						.set(navigation, { opacity: 0 })
						.set(photos, { opacity: 0.25, x: -500 })
						.to(navigation, { opacity: 1 }, 0)
						.to(photos, { opacity: 1, x: 0 }, 0)
						.to(wiper, { x: '100%' }, 0);
				});
			},
		},

		{
			name: 'previous',
			leave({ current, next, trigger }) {
				return new Promise(resolve => {
					const timeline = gsap.timeline({
						onComplete() {
							current.container.remove();
							resolve();
						},
					});

					const navigation = current.container.querySelectorAll(
						'header, a.next, a.previous'
					);
					const photos =
						current.container.querySelectorAll('div.photos');

					timeline
						.set(wiper, { x: '100%' })
						.set(wiperImage, { opacity: 0 })
						.set(wiperText, { y: '100%' })
						.to(navigation, { opacity: 0 }, 0)
						.to(photos, { opacity: 0.25, x: -500 }, 0)
						.to(wiper, { x: 0 }, 0);
				});
			},

			beforeEnter({ current, next, trigger }) {
				wiperText.textContent = next.container.dataset.title;

				return new Promise(resolve => {
					const timeline = gsap.timeline({
						defaults: { duration: 1 },

						onComplete() {
							resolve();
						},
					});

					timeline
						.to(wiperImage, { opacity: 1 }, 0)
						.to(wiperText, { y: 0 }, 0)
						.to(wiperText, { y: '100%' }, 2)
						.to(wiperImage, { opacity: 0 }, 2);
				});
			},

			enter({ current, next, trigger }) {
				return new Promise(resolve => {
					const timeline = gsap.timeline({
						onComplete() {
							resolve();
						},
					});

					const navigation = next.container.querySelectorAll(
						'header, a.next, a.previous'
					);
					const photos =
						next.container.querySelectorAll('div.photos');

					timeline
						.set(navigation, { opacity: 0 })
						.set(photos, { opacity: 0.25, x: 500 })
						.to(navigation, { opacity: 1 }, 0)
						.to(photos, { opacity: 1, x: 0 }, 0)
						.to(wiper, { x: '-100%' }, 0);
				});
			},
		},
	],
	views: [],
});
