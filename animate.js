function animate(draw, options) {
	console.log('animate');

	var start = performance.now();

	requestAnimationFrame(function animate(time) {
		// определить, сколько прошло времени с начала анимации
		var timePassed = time - start;

		// возможно небольшое превышение времени, в этом случае зафиксировать конец
		if (timePassed > options.duration) {
			timePassed = options.duration;
		}

		// нарисовать состояние анимации в момент timePassed
		if (timePassed < 0) {
			timePassed = 0;
		}
		
		options.timePassed = timePassed;
		
		draw(timePassed, options);

		// если время анимации не закончилось - запланировать ещё кадр
		if (timePassed < options.duration) {
			requestAnimationFrame(animate);
		}

	});
}