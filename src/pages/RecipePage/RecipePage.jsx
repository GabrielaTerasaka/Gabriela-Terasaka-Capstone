// import cookingImage from "../../assets/images/becca-tapert-O7sK3d3TPWQ-unsplash.jpg";
import "./RecipePage.scss";

import HomeHeader from "../../components/HomeHeader";

import HomeFooter from "../../components/HomeFooter";
import React from "react";
import axios from "axios";

export default class HomePage extends React.Component {
  componentDidMount() {
    axios
      .get(`https://tasty.p.rapidapi.com/recipes/list?from=150&size=100`, {
        headers: {
          "x-rapidapi-host": "tasty.p.rapidapi.com",
          "x-rapidapi-key":
            "29e04221d0mshaf105cfa3f98a75p17c7f7jsn9daa4eb2ab60",
        },
      })
      .then((response) => {
        // console.log(response.data.results);
        response.data.results.forEach((element) => {
          const { id, name, thumbnail_url, video_url, recipes } = element;
          // console.log(id, name, thumbnail_url, video_url);
          const {
            cook_time_minutes,
            instructions,
            num_servings,
            prep_time_minutes,
            credits,
            sections,
          } = recipes[0];
          // console.log(
          //   cook_time_minutes,
          //   instructions,
          //   num_servings,
          //   prep_time_minutes,
          //   credits[0].name,
          //   sections
          // );
          // console.log(sections.components);
          // thumbnail_url, video_url
          // recipes[0].cook_time_minutes  .instructions   .num_servings   .prep_time_minutes .credits[0].name .sections.components
        });
      })
      .catch();

    // axios
    //   .get(`https://tasty.p.rapidapi.com/recipes/detail?id=7918`, {
    //     headers: {
    //       "x-rapidapi-host": "tasty.p.rapidapi.com",
    //       "x-rapidapi-key":
    //         "29e04221d0mshaf105cfa3f98a75p17c7f7jsn9daa4eb2ab60",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch();
  }

  render() {
    return (
      <div>
        <HomeHeader />

        <HomeFooter />
      </div>
    );
  }
}
