type QueryError = { error: string };

type Identity = {
  addr: string;
  domain: string;
  domain_expiry: number | null;
  is_owner_main: boolean;
  owner_addr: string;
  old_discord?: string;
  old_twitter?: string;
  old_github?: string;
  starknet_id?: string;
  error?: string;
};

type ExternalDomains = {
  domains: string[];
};
