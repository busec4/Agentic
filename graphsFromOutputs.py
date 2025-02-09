import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os

def analyze_rl_data_in_folder(folder_path):
    print(f"Scanning folder: {folder_path}")

    if not os.path.exists(folder_path):
        raise FileNotFoundError(f"Error: The folder does not exist: {folder_path}")

    files = [f for f in os.listdir(folder_path) if f.endswith((".csv", ".xls", ".xlsx"))]
    
    if not files:
        print("No CSV or Excel files found in the folder.")
        return

    save_path = os.path.join(folder_path, "rl_analysis_graphs")
    os.makedirs(save_path, exist_ok=True)

    metric_mapping = {
        "learningRate": ("Learning Rate Over Steps", "Learning Rate", "blue"),
        "surrogatePPO": ("PPO Surrogate Loss Over Steps", "Loss", "red"),
        "value_func": ("Value Function Loss Over Steps", "Loss", "green"),
        "policy_meanNoise": ("Policy Mean Noise Over Steps", "Noise", "purple"),
        "Train_MeanReward": ("Training Mean Reward Over Steps", "Reward", "orange"),
        "lifting_object": ("Lifting Reward Over Steps", "Reward", "cyan"),
        "Reaching_object": ("Reaching Reward Over Steps", "Reward", "magenta"),
        "objectDropping": ("Object Dropping Over Steps", "Drop Rate", "black")
    }

    for file_name in files:
        file_path = os.path.join(folder_path, file_name)
        print(f"\nProcessing file: {file_name}")

        try:
            if file_name.endswith(".csv"):
                df = pd.read_csv(file_path)
            elif file_name.endswith((".xls", ".xlsx")):
                df = pd.read_excel(file_path)
            else:
                print(f"Skipping unsupported file format: {file_name}")
                continue
        except Exception as e:
            print(f"Error loading file {file_name}: {e}")
            continue

        df.columns = df.columns.str.strip()
        if "Step" not in df.columns or "Value" not in df.columns:
            print(f"Skipping {file_name}: Missing required columns (Step, Value)")
            continue

        detected_metrics = [
            (key, title, ylabel, color) for key, (title, ylabel, color) in metric_mapping.items()
            if key.lower() in file_name.lower()
        ]

        if detected_metrics:
            for keyword, title, ylabel, color in detected_metrics:
                print(f"Generating plot for: {title}")

                plt.figure(figsize=(10, 5))
                plt.plot(df["Step"], df["Value"], label=title, color=color)
                plt.title(title)
                plt.xlabel("Steps")
                plt.ylabel(ylabel)
                plt.grid(True)
                plt.legend()
                plt.savefig(os.path.join(save_path, f"{keyword}_{file_name}.png"))
                plt.close()
                print(f"{title} plot saved: {save_path}/{keyword}_{file_name}.png")

        else:
            print(f"No specific metric found for {file_name}. Generating a generic plot...")

            plt.figure(figsize=(10, 5))
            plt.plot(df["Step"], df["Value"], label="Generic RL Metric", color="gray")
            plt.title("Generic RL Metric Over Steps")
            plt.xlabel("Steps")
            plt.ylabel("Value")
            plt.grid(True)
            plt.legend()
            plt.savefig(os.path.join(save_path, f"generic_{file_name}.png"))
            plt.close()
            print(f"Generic RL metric plot saved: {save_path}/generic_{file_name}.png")

    print("\nAll files processed!")

folder_path =
analyze_rl_data_in_folder(folder_path)
