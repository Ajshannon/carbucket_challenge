import {
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt)

export { FontAwesomeIcon }
