import React from "react";
import {ExampleCard} from "./Card";

import "../styles.css";


export const About = (props) => {
  
  // render the board and the shuffle button
  return (
    <div>
      <section className="bg-light text-center pb-4 mt-3">
        <div className="bg-white container border border-success rounded">
          <div className="container pb-0 pt-1">
            <h2 className="cursive-font">these are</h2>
          </div>
          <div className="container pt-0">
            <h1 className="cursive-font">"CHETS"</h1>
          </div>

          <div className="container pt-0">
            <div className="row">
              <ExampleCard
                card_index={0 + 0 + 9 + 0}
                selected={true}
                set_found={true}
              />
              <ExampleCard
                card_index={1 + 3 + 9 + 27}
                selected={true}
                set_found={true}
              />
              <ExampleCard
                card_index={2 + 6 + 9 + 54}
                selected={true}
                set_found={true}
              />
            </div>
            <div className="container pt-3 m-0">
              <h4 className="cursive-font">
                different&nbsp;numbers -
                different&nbsp;shapes -
                same&nbsp;color -
                different&nbsp;sizes
              </h4>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <ExampleCard
                card_index={1 + 3 + 18 + 27}
                selected={true}
                set_found={true}
              />
              <ExampleCard
                card_index={1 + 3 + 0 + 0}
                selected={true}
                set_found={true}
              />
              <ExampleCard
                card_index={1 + 3 + 9 + 54}
                selected={true}
                set_found={true}
              />
            </div>
            <div className="container pt-3 m-0">
              <h4 className="cursive-font">
                same&nbsp;number -
                same&nbsp;shapes -
                different&nbsp;color -
                different&nbsp;sizes
              </h4>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <ExampleCard
                card_index={2 + 0 + 0 + 54}
                selected={true}
                set_found={true}
              />
              <ExampleCard
                card_index={2 + 3 + 0 + 54}
                selected={true}
                set_found={true}
              />
              <ExampleCard
                card_index={2 + 6 + 0 + 54}
                selected={true}
                set_found={true}
              />
            </div>
            <div className="container pt-3 m-0">
              <h4 className="cursive-font">
                same&nbsp;numbers -
                different&nbsp;shapes -
                same&nbsp;color -
                same&nbsp;sizes
              </h4>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light text-center pb-1 mb-0">
        <div className="bg-white container border border-danger rounded">
          <div className="container pb-0 pt-1">
            <h2 className="cursive-font">these are</h2>
          </div>
          <div className="container pt-0">
            <h1 className="cursive-font">NOT</h1>
          </div>

          <div className="container">
            <div className="row">
              <ExampleCard
                card_index={0 + 3 + 9 + 54}
                selected={true}
                set_found={false}
              />
              <ExampleCard
                card_index={1 + 3 + 9 + 27}
                selected={true}
                set_found={false}
              />
              <ExampleCard
                card_index={2 + 6 + 9 + 54}
                selected={true}
                set_found={false}
              />
            </div>
            <div className="container pt-3 m-0">
              <h4 className="cursive-font">
                two&nbsp;circles,&nbsp;one&nbsp;squiqqle -
                two&nbsp;medium,&nbsp;one&nbsp;big
              </h4>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <ExampleCard
                card_index={2 + 3 + 0 + 27}
                selected={true}
                set_found={false}
              />
              <ExampleCard
                card_index={2 + 3 + 0 + 0}
                selected={true}
                set_found={false}
              />
              <ExampleCard
                card_index={0 + 3 + 18 + 54}
                selected={true}
                set_found={false}
              />
            </div>
            <div className="container pt-3 m-0">
              <h4 className="cursive-font">
                two&nbsp;reds,&nbsp;one&nbsp;blue -
                two&nbsp;3s,&nbsp;one&nbsp;1
              </h4>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <ExampleCard
                card_index={2 + 0 + 18 + 0}
                selected={true}
                set_found={false}
              />
              <ExampleCard
                card_index={0 + 0 + 9 + 0}
                selected={true}
                set_found={false}
              />
              <ExampleCard
                card_index={1 + 6 + 18 + 54}
                selected={true}
                set_found={false}
              />
            </div>
            <div className="container pt-3 m-0">
              <h4 className="cursive-font">
                two&nbsp;blues,&nbsp;one&nbsp;green -
                two&nbsp;smalls,&nbsp;one&nbsp;medium -
                two&nbsp;Xs,&nbsp;one&nbsp;squiqqle
              </h4>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-light">     
        <div className="container text-center pt-5 pb-4">
          <button 
            className="btn-lg btn-primary" 
            onClick={props.onStartClicked} >
            START GAME
          </button>
        </div>
      </div>

      <section className="bg-light text-center pb-2 pt-4 m-0">
        <div className="container">
          <h5 className="cursive-font">
            this game was made as an exercise to learn more about <a href="https://reactjs.org/" target="blank">react</a> and <a href="https://www.djangoproject.com/" target="blank">django</a>. it is based on the card game
          </h5>
          <h1 className="cursive-font">
            <a href="https://www.playmonster.com/brands/set/" target="blank">SET</a>
          </h1>
        </div>
      </section>

    </div>
  );
}
