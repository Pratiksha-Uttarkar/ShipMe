import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
function About() {
  return (
    <div className="about">
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator="›"
          style={{
            color: "grey",
            marginLeft: "20px",
            marginRight: "60%",
            marginTop: "5%",
          }}
        >
          <Link underline="hover" color="green" href="/">
            Home
          </Link>

          <Link
            underline="hover"
            color="grey"
            href="/material-ui/react-breadcrumbs/"
            aria-current="page"
          >
            Bangalore
          </Link>
        </Breadcrumbs>
      </div>

      <h1>Bangalore</h1>
      <p
        style={{
          lineHeight:"24px",
          color: "rgb(111, 117, 136)",
          fontWeight: "500"
        }}
      >
        Why step out when you can get everything delivered home with the tap of
        a button? Bangalore’s favourite delivery app gets you Food, Grocery,
        Medicine, Pet Supplies, Fruits & Vegetables, Meat & Fish, Health &
        Wellness, Gifts and Send Packages from one end of the city to the other.
        From your local kirana stores to your favourite brands, grocery shopping
        to your forgotten charger, we are always on the move for you. Why worry
        about your chores, when you can get it all Dun!
      </p>
    </div>
  );
}

export default About;
