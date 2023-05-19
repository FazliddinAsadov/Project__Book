import {
  AppShell,
  Box,
  Burger,
  Center,
  Group,
  Header,
  Navbar,
  SegmentedControl,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useToggle } from "@mantine/hooks";
import {
  IconAppsFilled,
  IconMicroscope,
  IconMovie,
  IconUserCircle,
  IconBrandSlack,
} from "@tabler/icons-react";
import AccordionItem from "@web/components/AccordionItem";
import dataPages from "@web/services/api/dataPages";
import { useRouter } from "next/router";
import { useState } from "react";
import dashLayoutLocale from "./locale";
import useDashStyle from "./style/useDashStyle";
import ToggleTheme from "@web/components/darkMode/DarkLightMode";
import locale from "@web/translate/locale";
import Link from "next/link";

const activeStyle = {
  background: "#1864AB",
  color: "white",
};

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [activeId, setActiveId] = useState(null);
  const router = useRouter();
  const { classes, cx } = useDashStyle();
  const [fullView, toggleFullView] = useToggle();
  const [section, setSection] = useState<
    "maruza" | "amaliy" | "tajriba" | "video"
  >();
  const [active, setActive] = useState("Billing");

  const SegmentControlItem: React.FC<any> = ({
    amaliyLink,
    tajribaLink,
    videoLink,
    maruzaLink,
  }) => {
    return (
      <>
        <SegmentedControl
          color="orange"
          value={section}
          onChange={(value: "maruza" | "amaliy" | "tajriba" | "video") =>
            setSection(value)
          }
          transitionTimingFunction="ease"
          fullWidth
          data={[
            {
              label: (
                <Center>
                  <IconBrandSlack size="1rem" />
                  <Box ml={10} onClick={() => router.push(`/${maruzaLink}`)}>
                    {dashLayoutLocale.maruza}
                  </Box>
                </Center>
              ),
              value: "ma'ruza",
            },
            {
              label: (
                <Center>
                  <IconAppsFilled size="1rem" />
                  <Box ml={10} onClick={() => router.push(`/${amaliyLink}`)}>
                    {dashLayoutLocale.amaliy}
                  </Box>
                </Center>
              ),
              value: "amaliy",
            },
            {
              label: (
                <Center>
                  <IconMicroscope size="1rem" />
                  <Box ml={10} onClick={() => router.push(`/${tajribaLink}`)}>
                    {dashLayoutLocale.tajriba}
                  </Box>
                </Center>
              ),
              value: "tajriba",
            },
            {
              label: (
                <Center>
                  <IconMovie size="1rem" />
                  <Box ml={10} onClick={() => router.push(`/${videoLink}`)}>
                    {dashLayoutLocale.video}
                  </Box>
                </Center>
              ),
              value: "video",
            },
          ]}
        />
      </>
    );
  };

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="xs"
      asideOffsetBreakpoint="xs"
      navbar={
        !fullView ? (
          <Navbar
            // hiddenBreakpoint="sm"
            width={{
              sm: !fullView ? 430 : "min-content",
              md: !fullView ? 430 : "min-content",
              lg: !fullView ? 430 : "min-content",
              xl: !fullView ? 430 : "min-content",
            }}
            sx={{
              position: fullView ? "static" : "fixed",
              zIndex: 999,
            }}
            p={!fullView ? "md" : 0}
          >
            {fullView && (
              <Text className={classes.link}>
                <Burger
                  size={"sm"}
                  opened={!fullView}
                  onClick={() => toggleFullView()}
                />
              </Text>
            )}
            <Group>
              <Text className={classes.bob} pl={20}>
                {dashLayoutLocale.bob}
              </Text>
            </Group>
            <AccordionItem SegmentControlItem={SegmentControlItem} />
          </Navbar>
        ) : (
          <></>
        )
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div className={classes.head__div}>
            <Burger
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
              opened={!fullView}
              onClick={() => toggleFullView()}
            />
            <Box className={classes.head}>
              <Text onClick={() => router.push("/")} className={classes.title}>
                {locale.bmi}
              </Text>
              {/* <ToggleTheme /> */}
            </Box>
          </div>
        </Header>
      }
    >
      <Box mx={10}>{children}</Box>
    </AppShell>
  );
}
