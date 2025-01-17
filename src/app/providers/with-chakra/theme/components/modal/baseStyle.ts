import textStyles from 'src/app/providers/with-chakra/theme/foundations/textStyles';
import { definePartsStyle } from './parts';
import layerStyles from 'src/app/providers/with-chakra/theme/foundations/layerStyles';

export default definePartsStyle({
    closeButton: {
        width: '40px',
        height: '40px',
        right: '-52px',
        top: '12px',
        background: 'rgba(0, 0, 0, 0.4)',
        color: 'icon.contrast',
        backdropFilter: 'blur(16px)',
        borderRadius: '100%',
        '> svg': {
            width: '14px',
            height: '14px'
        },
        _hover: {
            transform: 'scale(1.03)'
        },
        _active: {
            transform: 'scale(0.97)'
        }
    },
    dialog: {
        borderRadius: 'lg'
    },
    overlay: {
        backdropFilter: 'blur(8px)'
    },
    header: {
        py: '5',
        px: '6',
        color: 'text.primary',
        ...textStyles.h4
    },
    body: {
        py: '4',
        pl: '6',
        pr: '5',
        mr: '1',
        ...layerStyles.customScrollbar
    },
    footer: {
        py: '6',
        px: '6'
    }
});
