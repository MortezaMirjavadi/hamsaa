import { useRef, useEffect } from "react";

export default function useEventListener(
  eventListener,
  shouldBeAttached = true
) {
  const {
    element = null,
    eventName = "",
    listener = () => {},
    options = { useCapture: false },
  } = eventListener;

  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = listener;
  }, [listener]);

  useEffect(() => {
    const eventListener = (evt) => savedHandler.current(evt);
    const { useCapture } = options;
    if (element && shouldBeAttached)
      element.addEventListener(eventName, eventListener);

    return () => {
      if (element) element.removeEventListener(eventName, eventListener);
    };
  }, [element, eventName, shouldBeAttached, options]);
}
