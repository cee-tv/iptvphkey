import uuid
from datetime import datetime, timedelta
import os

# Make sure the keys directory exists
os.makedirs("keys", exist_ok=True)

# Generate a random UUID key
key = uuid.uuid4()

# Use UTC+8 for local time (e.g., Philippines time)
utc_now = datetime.utcnow() + timedelta(hours=8)
date_str = utc_now.strftime('%Y-%m-%d')

# Save the key to a file named by the local date
with open(f"keys/{date_str}.txt", "w") as f:
    f.write(str(key))

print(f"Generated key for {date_str}: {key}")
