import axios from "axios";

function template1(phon_no_id, token, from, userName) {
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v20.0/" +
      phon_no_id +
      "/messages?access_token=" +
      token,
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: from,
      type: "template",
      template: {
        name: "template_name",
        language: {
          code: "en_US",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: userName,
              },
            ],
          },
        ],
      },
    },
    // data: {
    //   messaging_product: "whatsapp",
    //   recipient_type: "individual",
    //   to: from,
    //   type: "template",
    //   template: {
    //     name: "template1",
    //     language: {
    //       code: "en_US",
    //     },
    //     components: [
    //       {
    //         type: "body",
    //         parameters: [
    //           {
    //             type: "text",
    //             text: userName,
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
    // data: {
    //   messaging_product: "whatsapp",
    //   recipient_type: "individual",
    //   to: from,
    //   type: "text",
    //   text: {
    //     body: `Hi *${userName}*,\n \n To Become a Member of BJP,\n Enter your name
    //     `, //or\n to use Whatsapp registereed name(${userName}) enter NA`,
    //   },
    // },
    headers: {
      "Content-Type": "application/json",
    },
  });
}
function templateEnterStateName(phon_no_id, token, from) {
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v20.0/" +
      phon_no_id +
      "/messages?access_token=" +
      token,
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: from,
      type: "text",
      text: {
        body: "Enter your *state or union teritory* name.",
      },
    },

    headers: {
      "Content-Type": "application/json",
    },
  });
}
// function template2(phon_no_id, token, from) {
//   axios({
//     method: "POST",
//     url:
//       "https://graph.facebook.com/v20.0/" +
//       phon_no_id +
//       "/messages?access_token=" +
//       token,
//     data: {
//       messaging_product: "whatsapp",
//       recipient_type: "individual",
//       to: from,
//       type: "text",
//       text: {
//         body: "Enter your state or union teritory name?",
//       },
//     },
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).catch((err) => console.log("err at template2", err));
// }

function template3(phon_no_id, token, from) {
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v20.0/" +
      phon_no_id +
      "/messages?access_token=" +
      token,
    // data: {
    //   messaging_product: "whatsapp",
    //   recipient_type: "individual",
    //   to: from,
    //   type: "text",
    //   text: {
    //     preview_url: true,
    //     body: "Now you become a member of BJP, this is your membership card: https://whatsapp-bot-63e4.onrender.com",
    //   },
    // },
    data: {
      messaging_product: "whatsapp",
      to: from,
      type: "image",
      image: {
        link: "https://cdn.pixabay.com/photo/2024/07/07/22/30/volcano-8879779_640.jpg",
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function templateChangeName(phon_no_id, token, from) {
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v20.0/" +
      phon_no_id +
      "/messages?access_token=" +
      token,
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: from,
      type: "text",
      text: {
        body: "Enter your *new* name.",
      },
    },

    headers: {
      "Content-Type": "application/json",
    },
  });
}

function wrongInput(phon_no_id, token, from, text) {
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v20.0/" +
      phon_no_id +
      "/messages?access_token=" +
      token,
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: from,
      type: "text",
      text: {
        body: text,
      },
    },

    headers: {
      "Content-Type": "application/json",
    },
  });
}
export {
  template1,
  templateEnterStateName,
  template3,
  isStateOrUT,
  templateChangeName,
  wrongInput,
  isTextOnly,
};

const statesAndUTs = [
  "andhra pradesh",
  "arunachal pradesh",
  "assam",
  "bihar",
  "chhattisgarh",
  "goa",
  "gujarat",
  "haryana",
  "himachal pradesh",
  "jharkhand",
  "karnataka",
  "kerala",
  "madhya pradesh",
  "maharashtra",
  "manipur",
  "meghalaya",
  "mizoram",
  "nagaland",
  "odisha",
  "punjab",
  "rajasthan",
  "sikkim",
  "tamil nadu",
  "telangana",
  "tripura",
  "uttar pradesh",
  "uttarakhand",
  "west bengal",
  "andaman and nicobar islands",
  "chandigarh",
  "dadra and nagar haveli and daman and diu",
  "delhi",
  "lakshadweep",
  "puducherry",
  "ladakh",
  "jammu and kashmir",
  "jammu & kashmir",
];

function isStateOrUT(input) {
  return statesAndUTs.includes(input.toLowerCase());
}
function isTextOnly(input) {
  // Use a regular expression to match only alphabetic characters and spaces
  const regex = /^[A-Za-z ]+$/;
  return regex.test(input);
}

/**data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: from,
      type: "interactive",
      interactive: {
        type: "list",
        header: {
          type: "text",
          text: "Select Your State or union territory",
        },
        body: {
          text: "select your state or union territory from below list",
        },
        footer: {
          text: "This is a BJP bot, answer in a single line.",
        },
        action: {
          button: "States(28)",
          sections: [
            {
              title: "North",
              rows: [
                { id: "state_1", title: "Haryana" },
                // { id: "state_2", title: "Himachal Pradesh" },
                // { id: "state_3", title: "Punjab" },
                // { id: "state_4", title: "Uttarakhand" },
                // { id: "state_5", title: "Uttar Pradesh" },
                // { id: "state_6", title: "Jammu & Kashmir" },
                // { id: "state_28", title: "Sikkim" },
              ],
            },
            {
              title: "East",
              rows: [
                { id: "East_7", title: "Arunachal Pradesh" },
                // { id: "East_8", title: "Assam" },
                // { id: "East_9", title: "Bihar" },
                // { id: "East_10", title: "Jharkhand" },
                // { id: "East_11", title: "West Bengal" },
                // { id: "East_12", title: "Manipur" },
                // { id: "East_13", title: "Meghalaya" },
                // { id: "East_14", title: "Mizoram" },
                // { id: "East_15", title: "Nagaland" },
                // { id: "East_16", title: "Odisha" },
              ],
            },
            {
              title: "West",
              rows: [
                { id: "West_17", title: "Chhattisgarh" },
                // { id: "West_18", title: "Goa" },
                // { id: "West_19", title: "Gujarat" },
                // { id: "West_20", title: "Maharashtra" },
                // { id: "West_21", title: "Rajasthan" },
              ],
            },
            {
              title: "South",
              rows: [
                { id: "South_22", title: "Madhya Pradesh" },
                { id: "South_23", title: "Andhra Pradesh" },
                // { id: "South_24", title: "Karnataka" },
                // { id: "South_25", title: "Kerala" },
                // { id: "South_26", title: "Tamil Nadu" },
                // { id: "South_27", title: "Telangana" },
              ],
            },
            {
              title: "Union Territories",
              rows: [
                { id: "ut_1", title: "Andaman and Nicobar Islands" },
                // { id: "ut_2", title: "Chandigarh" },
                // { id: "ut_3", title: "Dadra and Nagar Haveli and Daman & Diu" },
                // { id: "ut_4", title: "Delhi" },
                // { id: "ut_5", title: "Ladakh" },
                // { id: "ut_6", title: "Lakshadweep" },
                // { id: "ut_7", title: "Puducherry" },
                { id: "ut_8", title: "Jammu and Kashmi" },
              ],
            },
          ],
        },
      },
    }, */
