import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    HStack,
    Box,
    Center,
    useDisclosure
} from '@chakra-ui/react';
import { ArrowIcon, MenuButtonStyled, TickIcon, Image, PlusIcon16 } from 'src/shared';
import { ComponentProps, FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import { projectsStore } from 'src/entities/project';
import { CreateProjectModal } from './CreateProjectModal';

const SelectProject_: FunctionComponent<ComponentProps<typeof Box>> = props => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (!projectsStore.selectedProject) {
        return null;
    }

    return (
        <Box {...props}>
            <Menu placement="bottom">
                <MenuButton as={MenuButtonStyled} w="240px" rightIcon={<ArrowIcon />}>
                    <HStack spacing="2">
                        {projectsStore.selectedProject.imgUrl ? (
                            <Image
                                w="7"
                                minW="7"
                                h="7"
                                borderRadius="sm"
                                src={projectsStore.selectedProject.imgUrl}
                            />
                        ) : (
                            <Center
                                w="7"
                                minW="7"
                                h="7"
                                mr="2"
                                color="constant.white"
                                bg={projectsStore.selectedProject.fallbackBackground}
                                borderRadius="sm"
                            >
                                {projectsStore.selectedProject.name[0]}
                            </Center>
                        )}
                        <Text textStyle="label2" noOfLines={1}>
                            {projectsStore.selectedProject.name}
                        </Text>
                    </HStack>
                </MenuButton>
                <MenuList zIndex={100} w="256px">
                    {projectsStore.projects.map(project => (
                        <MenuItem
                            key={project.id}
                            onClick={() => projectsStore.selectProject(project.id)}
                        >
                            {project.imgUrl ? (
                                <Image
                                    w="7"
                                    minW="7"
                                    h="7"
                                    mr="2"
                                    borderRadius="sm"
                                    src={project.imgUrl}
                                />
                            ) : (
                                <Center
                                    w="7"
                                    minW="7"
                                    h="7"
                                    mr="2"
                                    color="constant.white"
                                    bg={project.fallbackBackground}
                                    borderRadius="sm"
                                >
                                    {project.name[0]}
                                </Center>
                            )}
                            <Text textStyle="label2" color="text.primary" noOfLines={1}>
                                {project.name}
                            </Text>
                            {project.id === projectsStore.selectedProject!.id && (
                                <TickIcon ml="auto" />
                            )}
                        </MenuItem>
                    ))}
                    <MenuItem onClick={onOpen}>
                        <Center
                            w="7"
                            minW="7"
                            h="7"
                            mr="2"
                            borderRadius="sm"
                            bgColor="background.contentTint"
                        >
                            <PlusIcon16 />
                        </Center>
                        <Text textStyle="label2" color="text.primary" noOfLines={1}>
                            Create Project
                        </Text>
                    </MenuItem>
                </MenuList>
            </Menu>
            <CreateProjectModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};

export const SelectProject = observer(SelectProject_);
