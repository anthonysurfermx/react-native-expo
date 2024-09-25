import { FC } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { client, dynamicClient } from "../client";
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

// Display authenticated user view with only the Send 1 SOL button
export const DisplayAuthenticatedUserView: FC = () => {
  const { auth, wallets } = useReactiveClient(client);
  console.log("de hook")
  console.log(wallets.userWallets[0])
  return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.section__heading}>Actions</Text>
          <View style={[styles.content_section, styles.actions_section]}>
            <Button
                onPress={() => client.ui.userProfile.show()}
                title="User Profile UI"
            />
            <Button onPress={() => client.auth.logout()} title="Logout" />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.section__heading}>Send 1 SOL:</Text>
          <Send1SolButton destinationAddress="" wallet={wallets.userWallets[0]} />
        </View>
      </View>
  );
};

// Send 1 SOL button component
interface Send1SolButtonProps {
  destinationAddress: string;
}

/**
 * Renders a button that sends 1 SOL to a given address.
 */
const Send1SolButton: FC<Send1SolButtonProps> = ({ destinationAddress, wallet }) => {

  const send = async () => {
    const connection = client.solana.getConnection();
    const signer = client.solana.getSigner({ wallet });

    const { blockhash } = await connection.getLatestBlockhash();

    const amountInLamports = 0.1 * LAMPORTS_PER_SOL;
    const fromKey = new PublicKey(wallet.address);
    const toKey = new PublicKey(destinationAddress);

    const instructions = [
      SystemProgram.transfer({
        fromPubkey: fromKey,
        lamports: amountInLamports,
        toPubkey: toKey,
      }),
    ];

    console.log("yepx")
    console.log(instructions)

    const messageV0 = new TransactionMessage({
      instructions,
      payerKey: fromKey,
      recentBlockhash: blockhash,
    }).compileToV0Message();

    const transaction = new VersionedTransaction(messageV0);
    console.log("messageV0")
    console.log(messageV0)
    const { signature } = await signer.signAndSendTransaction(transaction);

    console.log("Successful transaction signature:", signature);
  };

  return (
      <View style={styles.buttonContainer}>
        <Button title="Send 1 SOL" onPress={send} />
      </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    alignContent: "stretch",
    padding: 20,
  },

  section: {
    gap: 5,
  },

  section__heading: {
    fontSize: 14,
    fontWeight: "bold",
  },

  buttonContainer: {
    marginTop: 10,
  },
});

export default DisplayAuthenticatedUserView;
