import React from "react";
import css from"./contain.css"
import {
  Header,
  ContentBtn,
  Header1,
  Para,
  ContentContainerImg,
  ContentContainerChild,
  ContentContainer,
  Container,
} from "./contentElements";
import imagbg2 from "../../images/_DSC4710.jpg";
import { left } from "../Hero/Icons";
import { Right } from "../Hero/Icons";

const Content = () => {
  return (
    <>
      <div className="container" Style="width:100%;margin-top:24px;">
        <div className="container-fluid">
          <Header
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            {/* Draupadi{" "} */}
          </Header>
          <br />
          <p
            style={{
              fontSize: 21,
              textAlign: "center",
              fontFamily: "Amiri,serif",
              color: "#404040",
              fontWeight: "700",
            }}
          >
            Empress | Empowering | Fearless
          </p>
          <br />
          <p style={{ color: "#E71E2D", fontSize: 22, textAlign: "center" }}>
            <b>“There's more to her, There's more to saris.”</b>
          </p>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="column">
            <Header1> <b>The Untold Story</b> </Header1>
            <br />
            <p
              style={{
                textAlign: "left",
                font: "inherit",
                color: "#404040",
                fontFamily: "Amiri,serif",
              }}
            >
              She was born out of the fire. With lotus eyes, dense hair, and
              convex nails, she was as mystical as beautiful. An economist by
              choice, valiant empress, an outspoken, opinionated, and fearless
              warrior. She was anything but a 'tragic heroine'.
              <br />
              <br />
              <p
                style={{
                  textAlign: "left",
                  position: "relative",
                  color: "#404040",
                  fontFamily: "Amiri,serif",
                  fontSize: 20,
                }}
              >
                <i>But did we know that?</i>
              </p>
            </p>
            <br />
            <p
              style={{
                textAlign: "left",
                fontFamily: "Amiri,serif",
                fontSize: 16,
                color: "#404040",
              }}
            >
              Draupadi is more than a lifestyle brand. It's a tribute to the
              unspoken identity of the <b>'tragic heroine'</b>. Just like how there's
              more to Draupadi, there's more to Sarees. Our bags and accessories
              are upcycled from sarees and handcrafted by women. We are inspired
              by the kindness and empowerment of Draupadi, and imbibe it to
              things we do.
            </p>
          </div>
          <div className="column">
            <ContentContainerImg id="cdiv2 covr" src={imagbg2} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Content;
