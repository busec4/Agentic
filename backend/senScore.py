import subprocess
import re
from web3 import Web3
from dotenv import load_dotenv


def get_rl_system_score():
    try:
        result = subprocess.run(["python3", "achievmentScore.py"], capture_output=True, text=True)
        output = result.stdout
        match = re.search(r"Final RL System Score: (\d+\.\d+)", output)
        if match:
            return float(match.group(1))
        else:
            raise ValueError("Could not extract RL system score from script output.")
    except Exception as e:
        print(f"Error running script: {e}")
        return None


def send_score_to_contract(score):
    # Configure Web3 connection
    INFURA_URL = "https://mainnet.infura.io/v3/" +  os.getenv(INFURA_API_KEY)
    PRIVATE_KEY =  os.getenv(PRIVATE_KEY)
    CONTRACT_ADDRESS = "0x"  
    ABI = [...]  

    web3 = Web3(Web3.HTTPProvider(INFURA_URL))

    if not web3.is_connected():
        print("Failed to connect to Ethereum network")
        return

    
    contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)


    account = web3.eth.account.from_key(PRIVATE_KEY)
    sender_address = account.address

 
    tx = contract.functions.storeScore(int(score * 100)).build_transaction({
        "from": sender_address,
        "gas": 200000,
        "gasPrice": web3.to_wei("5", "gwei"),
        "nonce": web3.eth.get_transaction_count(sender_address),
    })


    signed_tx = web3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)

    print(f"Transaction sent! TX Hash: {tx_hash.hex()}")

if __name__ == "__main__":
    rl_score = get_rl_system_score()
    if rl_score is not None:
        print(f"RL System Score: {rl_score}")
        send_score_to_contract(rl_score)
