const iconPaths = {
  play: "M8 5v14l11-7L8 5z",
  pause: "M7 5h4v14H7V5zm6 0h4v14h-4V5z",
  previous: "M6 6h2v12H6V6zm3 6 9-6v12l-9-6z",
  next: "M16 6h2v12h-2V6zm-1 6-9 6V6l9 6z",
  shuffle:
    "M16 4h4v4h-2V7h-1.2c-1.5 0-2.4.7-3.4 2.2l-.7 1.1-1.7-2.7.6-.9C12.8 4.9 14.3 4 16 4zM4 7h2.2c1.4 0 2.3.6 3.3 2l4 6c1 1.5 1.9 2 3.3 2H18v-1h2v4h-4v-2h.8c-1.8 0-3.3-.9-4.5-2.7l-4-6C7.3 7.7 6.6 7 5.2 7H4V5zm8.8 6.7.7 1.1c-1.1 1.6-2.5 2.2-4.3 2.2H4v-2h5.2c.9 0 1.6-.4 2.3-1.4l1.3-1.9z",
  repeat:
    "M7 7h9.2l-1.6-1.6L16 4l4 4-4 4-1.4-1.4L16.2 9H7c-1.7 0-3 1.3-3 3H2c0-2.8 2.2-5 5-5zm10 10H7.8l1.6 1.6L8 20l-4-4 4-4 1.4 1.4L7.8 15H17c1.7 0 3-1.3 3-3h2c0 2.8-2.2 5-5 5z",
  heart:
    "M12 20.4 10.8 19C6.6 15.2 4 12.8 4 9.8 4 7.4 5.9 5.5 8.3 5.5c1.4 0 2.7.6 3.7 1.7 1-1.1 2.3-1.7 3.7-1.7 2.4 0 4.3 1.9 4.3 4.3 0 3-2.6 5.4-6.8 9.2L12 20.4z",
  plus: "M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z",
  volume:
    "M4 10v4h4l5 4V6l-5 4H4zm12.5-2.5a6 6 0 0 1 0 9l-1.4-1.4a4 4 0 0 0 0-6.2l1.4-1.4zM18.7 5.3a9 9 0 0 1 0 13.4l-1.4-1.4a7 7 0 0 0 0-10.6l1.4-1.4z",
  home: "M4 11 12 4l8 7v9h-6v-6h-4v6H4v-9z",
  search:
    "M10.5 4a6.5 6.5 0 0 1 5.1 10.5l4 4-1.4 1.4-4-4A6.5 6.5 0 1 1 10.5 4zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z",
  library: "M5 5h3v14H5V5zm5 0h3v14h-3V5zm5.2.6 3-.6 2.8 13.3-3 .6L15.2 5.6z",
  queue: "M5 7h14v2H5V7zm0 4h14v2H5v-2zm0 4h8v2H5v-2zm10-.5 4 2.5-4 2.5v-5z",
  admin:
    "M12 3l7 3v5c0 4.4-2.8 8.4-7 10-4.2-1.6-7-5.6-7-10V6l7-3zm0 2.2L7 7.4V11c0 3.3 1.9 6.3 5 7.6 3.1-1.3 5-4.3 5-7.6V7.4l-5-2.2zm-1 4h2v3h3v2h-3v3h-2v-3H8v-2h3v-3z",
};

export default function Icon({ name, className = "icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={iconPaths[name]} fill="currentColor" />
    </svg>
  );
}
