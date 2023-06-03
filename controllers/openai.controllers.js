const { openai } = require("../config/openai.config");

//generate data
exports.generateMeta = async (req, res) => {
  const { title } = req.body;

  const description = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${title}`,
      },
    ],
    max_tokens: 100,
  });

  return res.status(200).json({
    success: true,
    description: description.data.choices[0].message,
  });
};
