import { extendTheme } from '@chakra-ui/react'
import { theme as base} from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    ...base.colors,
    // orange: "teal",
    // error: "#FF0202",
    error: {
      50: "#FF0202",
      100: "#FF0202",
      200: "#FF0202",
      300: "#FF0202",
      400: "#FF0202",
      500: "#FF0202",
      600: "#FF0202",
      700: "#FF0202",
      800: "#FF0202",
      900: "#FF0202"
    },
    brand: {
      50: "teal",
      100: "teal",
      200: "teal",
      300: "teal",
      400: "teal",
      500: "teal",
      600: "teal",
      700: "teal",
      800: "teal",
      900: "teal"
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
  components: {
    Button: {
      baseStyle: {
        // background: "red",
        // color: "red",
        borderLeftRadius: "8px",
        borderRightRadius: "8px",
      }
    }
  }
})

export default theme
