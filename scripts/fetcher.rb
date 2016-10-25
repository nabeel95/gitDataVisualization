require 'open-uri'
require 'json'

class Exec

  HTML_PATH = '../data/sample.html'
  WRITABLE_FILE_PATH = '../data/4500.json'
  READABLE_FILE_PATH = '../data/final_data.json'
  ERROR_FILE = '../data/errors.json'
  CREDENTIALS = # put your credential  here
  
  def in_hash languages_url, name, contributors_url
    params = {}

    begin
      html = File.read(HTML_PATH)
      data = html.split('<span class="num text-emphasized">')
      params[:commits] = data[1].split("\n")[1].to_i
      params[:branches] = data[2].split("\n")[1].to_i
      params[:release] = data[3].split("\n")[1].to_i
      begin
        params[:contributers] = html.split('num text-emphasized')[4].split("\n")[1].to_i
      rescue
        p "fetch executed for #{name}"
        params[:contributers] = get_data(contributors_url)
      end
      params[:watch] = html.split(' watching this repository">')[1].split("\n")[1].to_i
      params[:star] = html.split('users starred this repository">')[1].split("\n")[1].to_i
      params[:forks] = html.split(' forked this repository">')[1].split("\n")[1].to_i
      issues_data = html.split('<span itemprop="name">Issues</span>')[1]
      params[:issues] = 0
      if issues_data != nil
        params[:issues] = issues_data.split("\n")[1].strip.split(">")[1].split("<")[0]
      end
      pulls_data = html.split('<span itemprop="name">Pull requests</span>')[1]
      params[:pulls] = 0
      if pulls_data != nil
        params[:pulls] = pulls_data.split("\n")[1].strip.split('>')[1].split("<")[0]
      end
      params[:languages] = JSON.parse(open(languages_url+'?'+CREDENTIALS).read).keys
      params[:name] = name
      params
    rescue
      File.open(ERROR_FILE, 'a') { |file| file.write(name) }
    end
  end

  def get_data url
    exists = true
    page = 1
    length = 0
    while exists
      url_auth_map = url+'?page='+page.to_s+'&'+CREDENTIALS
      info = JSON.parse(open(url_auth_map).read)
      info_length = info.length
      exists = info_length != nil && info_length != 0
      page+= 1
      length += info_length
    end
    length
  end


  def fetchAllReposData(repos_data)
    data = getUnique(JSON.parse(repos_data))
    final_info = []

    (4001..data.length).each do |i|
      begin
        p "processing repo no: #{i}"
        name = data[i]['name']
        File.open(HTML_PATH, 'w') { |file| file.write(open("https://github.com/#{name}").read) }
        fetched_repo_data = in_hash(data[i]['languages_url'], name, data[i]['contributors_url'])
        if fetched_repo_data != nil
          final_info.push(fetched_repo_data)
        else
          p name +' data = ' + fetched_repo_data.to_s
        end
      rescue
        p "failed to fetch#{name}"
      end

    end
    file_data = File.read(WRITABLE_FILE_PATH)
    # File.open(WRITABLE_FILE_PATH, 'w') { |file| file.write(JSON.parse(file_data).concat(final_info).to_json) }
  end

  def getUnique data
    ids = []
    data.select{ |item|
      if ids.index(item["id"]) == nil
        ids.push(item["id"])
      end
    }
  end

  def write
    fetchAllReposData(File.read(READABLE_FILE_PATH))
  end
end

exec = Exec.new
exec.write