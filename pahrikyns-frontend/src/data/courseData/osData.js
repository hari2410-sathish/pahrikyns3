export const osData = {
    "os-intro": {
        title: "Operating Systems Introduction",
        description: "The bridge between user applications and computer hardware.",
        longDescription: `
      An Operating System (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.
      
      ### Functions of an OS:
      - **Process Management**: Handling multiple processes concurrently.
      - **Memory Management**: Allocating memory to running applications.
      - **File System Management**: Organizing files on storage drives.
      - **Device Management**: Communicating with hardware via drivers.
    `,
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Operating_system_placement.svg",
        videoUrl: "https://www.youtube.com/embed/26QPDBe-NB8", // Valid OS Intro Video
        codeExample: {
            language: "c",
            title: "Simple C Kernel (Bootloader)",
            content: `
/* =====================================
   A minimal Kernel written in C
   ===================================== */
void main() {
    // Video memory begins at address 0xb8000
    char* video_memory = (char*) 0xb8000;
    
    // Print "Hello OS" to screen
    *video_memory = 'H'; video_memory += 2;
    *video_memory = 'e'; video_memory += 2;
    *video_memory = 'l'; video_memory += 2;
    *video_memory = 'l'; video_memory += 2;
    *video_memory = 'o'; video_memory += 2;
    *video_memory = ' '; video_memory += 2;
    *video_memory = 'O'; video_memory += 2;
    *video_memory = 'S'; video_memory += 2;
    
    // Halt the CPU
    while(1) {}
}

/**
 * Detailed explanation of Booting:
 * 1. BIOS loads MBR (512 bytes) from disk.
 * 2. MBR loads the Bootloader.
 * 3. Bootloader loads the Kernel into memory.
 * 4. Control is transferred to Kernel main().
 */
      `
        }
    },
    "kernel-&-shell": {
        title: "Kernel & Shell Basics",
        description: "The core of the OS and the interface to interact with it.",
        codeExample: { language: "bash", title: "Interacting with Shell", content: "# Checking Shell Type\necho $SHELL\n# Listing processes\nps aux" }
    },
    "process-management": {
        title: "Process Management",
        description: "Creation, scheduling, and termination of processes.",
        codeExample: { language: "c", title: "Fork Bomb (Educational Only)", content: "while(1) fork(); // Do not run this!" }
    },
    "memory-management": {
        title: "Memory Management",
        description: "Paging, segmentation, and virtual memory.",
        codeExample: { language: "c", title: "Malloc and Free", content: "#include <stdlib.h>\nvoid* ptr = malloc(1024);\nfree(ptr);" }
    },
    "file-systems": {
        title: "File Systems (EXT4, NTFS)",
        description: "How data is stored and retrieved on disk.",
        codeExample: { language: "bash", title: "Mounting and Formatting", content: "mkfs.ext4 /dev/sda1\nmount /dev/sda1 /mnt" }
    },
    "user-management": {
        title: "User & Group Management",
        description: "Managing access and identities on a multi-user system.",
        codeExample: { language: "bash", title: "Adding Users Script", content: "useradd -m newuser\npasswd newuser" }
    },
    "permissions": {
        title: "Permissions & ACLs",
        description: "Read, Write, and Execute. Octal vs Symbolic permissions.",
        codeExample: { language: "bash", title: "Chmod examples", content: "chmod 755 script.sh\nchown root:root script.sh" }
    },
    "package-management": {
        title: "Package Management",
        description: "Installing, updating, and removing software (apt, yum, dnf).",
        codeExample: { language: "bash", title: "APT Update Script", content: "apt-get update && apt-get upgrade -y" }
    },
    "networking-basics": {
        title: "Networking Basics",
        description: "IP addresses, DNS, DHCP, and Ports.",
        codeExample: { language: "bash", title: "Netstat and IP", content: "ip addr show\nnetstat -tulpn" }
    },
    "system-security": {
        title: "System Security",
        description: "Firewalls (UFW, iptables), SSH hardening, and auditing.",
        codeExample: { language: "bash", title: "UFW Configuration", content: "ufw allow 22\nufw allow 80\nufw enable" }
    },
    "shell-basics": {
        title: "Shell Scripting Basics",
        description: "Automate tasks using Bash scripts.",
        codeExample: { language: "bash", title: "Hello World Script", content: "#!/bin/bash\necho 'Hello World'" }
    },
    "advanced-bash": {
        title: "Advanced Bash Scripting",
        description: "Loops, arrays, functions, and error handling in Bash.",
        codeExample: { language: "bash", title: "Backup Rotation Script", content: "#!/bin/bash\n# Complex logic to rotate logs..." }
    },
    "powershell-basics": {
        title: "PowerShell Basics",
        description: "Command-line shell and scripting language built on .NET.",
        codeExample: { language: "powershell", title: "Get-Process", content: "Get-Process | Sort-Object CPU -Descending" }
    },
    "powershell-automation": {
        title: "PowerShell Automation",
        description: "Advanced automation tasks for Windows environments.",
        codeExample: { language: "powershell", title: "Active Directory User Creation", content: "New-ADUser -Name 'John Doe' ..." }
    },
    "systemd": {
        title: "Systemd & Services",
        description: "The init system used in Linux distributions to bootstrap the user space.",
        codeExample: { language: "ini", title: "Custom Service Unit File", content: "[Unit]\nDescription=MyApp\n[Service]\nExecStart=/usr/bin/python main.py" }
    },
    "storage-management": {
        title: "Storage Management",
        description: "LVM, RAID, and Partitioning.",
        codeExample: { language: "bash", title: "LVM Setup", content: "pvcreate /dev/sdb\nvgcreate vg1 /dev/sdb\nlvcreate -L 10G -n lv1 vg1" }
    },
    "virtualization": {
        title: "Virtualization Types",
        description: "Type 1 vs Type 2 Hypervisors. KVM and VirtualBox.",
        codeExample: { language: "bash", title: "Virsh Commands", content: "virsh list --all\nvirsh start my-vm" }
    },
    "logs-&-troubleshooting": { // Note: component needs to handle ampersand
        title: "Logs & Troubleshooting",
        description: "Reading /var/log, dmesg, and journalctl.",
        codeExample: { language: "bash", title: "Journalctl Filtering", content: "journalctl -u nginx --since 'yesterday'" }
    },
    "ubuntu-server": {
        title: "Ubuntu Server Administration",
        description: "Managing the world's most popular Linux server distro.",
        codeExample: { language: "bash", title: "Unattended Upgrades Config", content: "cat /etc/apt/apt.conf.d/50unattended-upgrades" }
    },
    "red-hat-enterprise": {
        title: "Red Hat Enterprise Linux (RHEL)",
        description: "Enterprise-grade reliability and support.",
        codeExample: { language: "bash", title: "Subscription Manager", content: "subscription-manager register --username admin --password secret" }
    }
};
