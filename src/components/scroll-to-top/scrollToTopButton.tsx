
import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

// creating the properties for our functional component.  
interface ScrollTopArrowProps {
    visibleBelow?: number // how far the user needs to scroll (in pixels) before the scroll button appears.
}

export const ScrollToTopButton: React.FC<ScrollTopArrowProps> = ({ visibleBelow = 300 }) => {
    // creating a state which will allow us to set the visibility of the scroll button
    const [showScroll, setShowScroll] = useState<boolean>(false);

    useEffect(() => {
        // while the component is mounted, add the event listener
        window.addEventListener('scroll', checkScrollTop);
        return () => {
            // component unmounted, no longer need the event listener.
            window.removeEventListener('scroll', checkScrollTop);
        }
    });

    // creating a function which will check if the use has scrolled pased the visible offsets. If so, show else hide!
    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > visibleBelow) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= visibleBelow) {
            setShowScroll(false)
        }
    }

    // creating a function which force the user to scroll to top when the button is pressed.
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button className={`scrollToTopButton ${showScroll ? "fade-in" : "fade-out"}`} onClick={scrollTop}>
            <IoIosArrowUp/>
        </button>
    )
}

export default ScrollToTopButton;