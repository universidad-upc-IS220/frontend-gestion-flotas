import { extendTheme } from '@chakra-ui/react'
import { theme as base} from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    ...base.colors,
    // orange: "#28cc9e",
    error: "#FF0202",
    brand: {
      50: "#28cc9e",
      100: "#28cc9e",
      200: "#28cc9e",
      300: "#28cc9e",
      400: "#28cc9e",
      500: "#28cc9e",
      600: "#28cc9e",
      700: "#28cc9e",
      800: "#28cc9e",
      900: "#28cc9e"
    }
  },
  fonts: {
    heading: `Roboto, ${base.fonts?.heading}`,
    body: 'Roboto, sans-serif',
  },
  textStyles: {
    input: {
      fontFamily: "Roboto",
    },

  },
})

export default theme
