import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTimes, faFilePdf, faEllipsisV, faChevronUp, faChevronLeft, faChevronRight, faCog,
} from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTimes, faFilePdf, faEllipsisV, faChevronUp, faChevronLeft, faChevronRight, faCog);


Vue.component('font-awesome-icon', FontAwesomeIcon);
