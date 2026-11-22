/**
 * "Our Trusted Pack": the partner and client logo wall. All 24 partners from the old home page
 * stay, as the owner chose them, in the old order (companies first, then schools), with names
 * and canonical URLs from archive/research/reviews-partners-history.md. The owner added three
 * schools in November 2026 (internships and sponsors), grouped with the other schools.
 *
 * - The "remote-control-media" logo is Remote Control Enterprises (the company's current name).
 * - Cartoon Network links to cartoonnetwork.com (the old UK link has an expired certificate).
 * - mTrigger's address has no "www".
 * - Delaware College of Art and Design (closed in 2024) and Digital Media Institute (its site
 *   no longer resolves) keep their tiles and have no link.
 */
import type { Partner } from "./types";

export const PARTNERS: Partner[] = [
  { name: "Unity", url: "https://unity.com/", logo: "partners/unity.jpg", kind: "company" },
  { name: "Remote Control Enterprises", url: "https://www.rc.enterprises/", logo: "partners/remote-control-media.jpg", kind: "company" },
  { name: "Peloton", url: "https://www.onepeloton.com/", logo: "partners/peloton.jpg", kind: "company" },
  { name: "GUMBO NYC", url: "https://gumbonyc.org/", logo: "partners/gumbo-nyc.jpg", kind: "organization" },
  { name: "Computer Lunch", url: "https://games.computerlunch.com/", logo: "partners/computer-lunch.jpg", kind: "company" },
  { name: "Cartoon Network", url: "https://www.cartoonnetwork.com/", logo: "partners/cartoon-network.jpg", kind: "company" },
  { name: "Mega Cat Studios", url: "https://megacatstudios.com/", logo: "partners/mega-cat-studios.jpg", kind: "company" },
  { name: "Red Essence Games", url: "https://www.redessencegames.com/", logo: "partners/red-essence-games.jpg", kind: "company" },
  { name: "Looney Labs", url: "https://www.looneylabs.com/", logo: "partners/looney-labs.jpg", kind: "company" },
  { name: "IGDA", url: "https://igda.org/", logo: "partners/igda.jpg", kind: "organization" },
  { name: "Legends of Learning", url: "https://www.legendsoflearning.com/", logo: "partners/legends-of-learning.jpg", kind: "company" },
  { name: "Kodeco", url: "https://www.kodeco.com/", logo: "partners/kodeco.jpg", kind: "company" },
  { name: "Barron Associates", url: "https://www.barron-associates.com/", logo: "partners/barron-associates.jpg", kind: "company" },
  { name: "Nemours Children's Health", url: "https://www.nemours.org/", logo: "partners/nemours-childrens-health.jpg", kind: "organization" },
  { name: "mTrigger", url: "https://mtrigger.com/", logo: "partners/mtrigger.jpg", kind: "company" },
  {
    name: "Damocles Thread Development",
    url: "https://damoclesthreaddevelopment.wordpress.com/",
    logo: "partners/damocles-thread-development.jpg",
    kind: "company",
  },
  { name: "The Franklin Institute", url: "https://fi.edu/en", logo: "partners/the-franklin-institute.jpg", kind: "organization" },

  // Schools
  { name: "Digital Media Institute", logo: "partners/digital-media-institute.png", kind: "school", wide: true },
  { name: "Cecil College", url: "https://www.cecil.edu/", logo: "partners/cecil-college.jpg", kind: "school" },
  { name: "University of Illinois Urbana-Champaign", url: "https://illinois.edu/", logo: "partners/university-of-illinois.jpg", kind: "school" },
  { name: "Delaware College of Art and Design", logo: "partners/delaware-college-of-art-and-design.png", kind: "school", wide: true },
  { name: "Southern Methodist University", url: "https://www.smu.edu/", logo: "partners/southern-methodist-university.jpg", kind: "school" },
  {
    name: "Harrisburg University of Science and Technology",
    url: "https://www.harrisburgu.edu/",
    logo: "partners/harrisburg-university.jpg",
    kind: "school",
  },
  { name: "Wilmington University", url: "https://www.wilmu.edu/", logo: "partners/wilmington-university.jpg", kind: "school" },
  // Added by the owner (November 2026). Interns have come from George Mason and Old Dominion;
  // Brightpoint is a partner, with no further relationship stated.
  { name: "George Mason University", url: "https://www.gmu.edu/", logo: "partners/george-mason-university.png", kind: "school", wide: true },
  { name: "Old Dominion University", url: "https://www.odu.edu/", logo: "partners/old-dominion-university.png", kind: "school", wide: true },
  {
    name: "Brightpoint Community College",
    url: "https://www.brightpoint.edu/",
    logo: "partners/brightpoint-community-college.png",
    kind: "school",
  },
];
