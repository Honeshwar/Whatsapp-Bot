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
        name: "template1",
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
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function template2(phon_no_id, token, from) {
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
      type: "interactive",
      interactive: {
        type: "list",
        header: {
          type: "text",
          text: "Select Your State",
        },
        body: {
          text: "select your state from below list",
        },
        footer: {
          text: "This is a BJP bot, answer in a single line.",
        },
        action: {
          button: "States(28)",
          sections: [
            {
              title: "Total States(28)",
              rows: [
                {
                  id: "state_1",
                  title: "Andhra Pradesh",
                },
                {
                  id: "state_2",
                  title: "Arunachal Pradesh",
                },
                {
                  id: "state_3",
                  title: "Assam",
                },
                {
                  id: "state_4",
                  title: "Bihar",
                },
                {
                  id: "state_5",
                  title: "Chhattisgarh",
                },
                {
                  id: "state_6",
                  title: "Goa",
                },
                {
                  id: "state_7",
                  title: "Gujarat",
                },
                {
                  id: "state_8",
                  title: "Haryana",
                },
                {
                  id: "state_9",
                  title: "Himachal Pradesh",
                },
                {
                  id: "state_10",
                  title: "Jharkhand",
                },
                {
                  id: "state_11",
                  title: "Karnataka",
                },
                {
                  id: "state_12",
                  title: "Kerala",
                },
                {
                  id: "state_13",
                  title: "Madhya Pradesh",
                },
                {
                  id: "state_14",
                  title: "Maharashtra",
                },
                {
                  id: "state_15",
                  title: "Manipur",
                },
                {
                  id: "state_16",
                  title: "Meghalaya",
                },
                {
                  id: "state_17",
                  title: "Mizoram",
                },
                {
                  id: "state_18",
                  title: "Nagaland",
                },
                {
                  id: "state_19",
                  title: "Odisha",
                },
                {
                  id: "state_20",
                  title: "Punjab",
                },
                {
                  id: "state_21",
                  title: "Rajasthan",
                },
                {
                  id: "state_22",
                  title: "Sikkim",
                },
                {
                  id: "state_23",
                  title: "Tamil Nadu",
                },
                {
                  id: "state_24",
                  title: "Telangana",
                },
                {
                  id: "state_25",
                  title: "Tripura",
                },
                {
                  id: "state_26",
                  title: "Uttar Pradesh",
                },
                {
                  id: "state_27",
                  title: "Uttarakhand",
                },
                {
                  id: "state_28",
                  title: "West Bengal",
                },
              ],
            },
          ],
        },
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function template3(phon_no_id, token, from) {
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
        preview_url: true,
        body: "Now you become a member of BJP, this is your membership card: https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_auto:best,t_productPageHeroGalleryTransformation_v2,w_auto/India%20LOB/visiting-cards/Non-Tearable%20Visiting%20Cards/IN_Non-Tearable-Visiting-Cards_Hero-image_01",
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { template1, template2, template3 };
