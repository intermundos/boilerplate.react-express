module.exports = {
  plugins: [
    ( process.env.NODE_ENV === 'production' && require( 'css-mqpacker' )( )),
    require( 'rucksack-css' )({ autoprefixer: true })
  ]
}