import React, { useState, useEffect } from "react";

const ScrollUpButton: React.FC = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const handleScroll = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<>
			{isVisible && (
				<button
					onClick={scrollToTop}
					className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg focus:outline-none"
					aria-label="Scroll to top"
				>
					<span className="text-2xl">↑</span>
				</button>
			)}
		</>
	);
};

export default ScrollUpButton;
