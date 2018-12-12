import React from "react";
import { Header, Image, Segment } from "semantic-ui-react";

const Welcome = () => {
  return (
    <Segment>
      <Header as="h1" textAlign="center">
        Welcome to TestNet
        <Header.Subheader content="the best tests on the net" />
      </Header>
      <Image src="https://i.imgur.com/DnK3GYI.jpg" alt="pretty mountains" />
    </Segment>
  );
};

export default Welcome;
