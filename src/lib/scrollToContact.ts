/**
 * Scrolls to the #contact section.
 * Works with Lenis smooth scroll by using scrollIntoView — Lenis intercepts
 * native scrollIntoView calls and applies its own smooth easing.
 */
export function scrollToContact() {
  const target = document.getElementById("contact");
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
