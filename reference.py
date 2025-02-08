import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

steps = np.linspace(1, 1000, 1000)

learning_rate = np.exp(-steps / 300) * 0.01  
ppo_surrogate_loss = np.exp(-steps / 250) * 0.01  
value_function_loss = np.exp(-steps / 350) * 0.02  
policy_mean_noise = 1 + 0.05 * np.sin(2 * np.pi * steps / 400)  
train_mean_reward = 1 - np.exp(-steps / 300)  
lifting_reward = 1 - np.exp(-steps / 350)  
reaching_reward = 1 - np.exp(-steps / 320)  
object_dropping = np.exp(-steps / 280) * 0.1  

df = pd.DataFrame({
    "Steps": steps,
    "Learning Rate": learning_rate,
    "PPO Surrogate Loss": ppo_surrogate_loss,
    "Value Function Loss": value_function_loss,
    "Policy Mean Noise": policy_mean_noise,
    "Train Mean Reward": train_mean_reward,
    "Lifting Reward": lifting_reward,
    "Reaching Reward": reaching_reward,
    "Object Dropping": object_dropping,
})

correlation_matrix = df.drop(columns=["Steps"]).corr()
relevance_scores = correlation_matrix.mean().apply(lambda x: round((abs(x) * 10), 2))

importance_weights = {
    "Train Mean Reward": 30,
    "Reaching Reward": 20,
    "Lifting Reward": 15,
    "PPO Surrogate Loss": 10,
    "Value Function Loss": 10,
    "Policy Mean Noise": 5,
    "Learning Rate": 5,
    "Object Dropping": 5
}

total_weight = sum(importance_weights.values())
normalized_weights = {k: v / total_weight for k, v in importance_weights.items()}
final_score = sum(relevance_scores[metric] * normalized_weights[metric] for metric in importance_weights)

fig, axes = plt.subplots(3, 3, figsize=(12, 12))
fig.suptitle("Optimum RL System Graphs", fontsize=16)

metrics = [
    ("Learning Rate", "blue"),
    ("PPO Surrogate Loss", "red"),
    ("Value Function Loss", "green"),
    ("Policy Mean Noise", "purple"),
    ("Train Mean Reward", "orange"),
    ("Lifting Reward", "cyan"),
    ("Reaching Reward", "magenta"),
    ("Object Dropping", "black")
]

for idx, (metric, color) in enumerate(metrics):
    row, col = divmod(idx, 3)
    axes[row, col].plot(df["Steps"], df[metric], color=color, label=metric)
    axes[row, col].set_title(f"{metric} Over Steps")
    axes[row, col].set_xlabel("Steps")
    axes[row, col].set_ylabel("Value")
    axes[row, col].legend()
    axes[row, col].grid(True)

plt.tight_layout(rect=[0, 0, 1, 0.96])
plt.show()

print(f"Final RL System Score: {round(final_score, 2)} / 10")
