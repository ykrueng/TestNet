import React from "react";
import { Header, Image, Segment } from "semantic-ui-react";

const Welcome = () => {
  return (
    <Segment
      style={{ width: "100%", maxHeight: "94vh", overflow: "hidden", margin: "0", padding: "0" }}
    >
      <Header as="h1" textAlign="center" style={{ paddingTop: "1rem" }}>
        Welcome to TestNet
        <Header.Subheader content="the best tests on the net" />
      </Header>
      <Image src="https://i.imgur.com/DnK3GYI.jpg" alt="pretty mountains" />
    </Segment>
  );
};

export default Welcome;
