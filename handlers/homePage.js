
module.exports =(req, res) => {
  const my_message = `You\`re breathtaking!!!`
  res.render('index', {title: 'SHRI Homework', message: my_message})
}

