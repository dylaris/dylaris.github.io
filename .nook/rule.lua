return {
  struct = {
    title = "string",
    status = { "todo", "doing", "done" },
    priority = "number",
    date = "string",
    tag = "string",
  },

  format = {
    brief = function(e)
      local prefix = ""
      if e.status == "todo" then
        prefix = "\27[32m"  -- green
      elseif e.status == "done" then
        prefix = "\27[37m"  -- gray
      elseif e.status == "doing" then
        prefix = "\27[34m"  -- blue
      else
        prefix = "\27[0m"
      end
      return prefix .. e.priority .. " | " .. e.date .. " | " .. e.status .. " | " .. e.title .. "\27[0m"
    end
  },

  filter = {
    status = function(e, status)
      return e.status == status
    end,

    today = function(e)
      local now = os.date("*t")
      local today_str = string.format("%04d-%02d-%02d", now.year, now.month, now.day)
      return e.date == today_str
    end,

    search = function(e, keyword)
      return e.title:lower():find(keyword:lower(), 1, true) ~= nil
    end,

    tag = function(e, tag)
      return e.tag == tag
    end,
  },

  sort = {
    date = function(a, b)
      return a.date > b.date
    end,

    priority = function(a, b)
      return a.priority > b.priority
    end,
  },

  foreach = {
    status = function(e, s)
      e.status = s
    end,

    title = function(e, s)
      e.title = e.title .. " + " .. s
    end
  },

  reduce = {
    count = function(es) print(#es) end,
  }
}
