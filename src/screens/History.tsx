
import { Header } from "@components/Header";
import { HistoryCard } from "@components/HistoryCard";
import { Center, Text, VStack } from "native-base";

export function History() {
    return (
        <VStack flex={1} >
          <Header
          title="Histórico de exercícios"
          />
          <HistoryCard />
        </VStack>
    )
}