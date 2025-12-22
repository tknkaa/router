{ pkgs }:
pkgs.mkShell {
  # Add build dependencies
  packages = [
    pkgs.nodePackages.vercel
  ];

  # Add environment variables
  env = { };

  # Load custom bash code
  shellHook = ''

  '';
}
