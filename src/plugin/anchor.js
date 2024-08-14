import { computed } from "vue";
import { useAnchorWallet } from "solana-wallets-vue";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import idl from "@/idl.json";
import solanaConstant from "@/constant/solana";

const preflightCommitment = "processed";
const commitment = "confirmed";
const programID = new PublicKey(solanaConstant.program_id);

let workspace = null;

// Export
export default {
    install: (app) => {
        app.config.globalProperties.$useAnchor = () => {
            if (workspace) {
                return workspace;
            }
            const wallet = useAnchorWallet();
            if (!wallet) return null;
            const connection = new Connection(clusterApiUrl(solanaConstant.network), commitment);
            const provider = computed(
                () =>
                new AnchorProvider(connection, wallet.value, {
                    preflightCommitment,
                    commitment,
                })
            );
            const program = computed(() => new Program(idl, programID, provider.value));
            
            workspace = {
                wallet,
                connection,
                provider,
                program,
            };
            return workspace;
        };

        app.config.globalProperties.$pgAnchor = () => app.config.globalProperties.$useAnchor().program.value;
    }
}